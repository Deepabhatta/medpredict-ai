from flask import Blueprint, request, jsonify, send_file
import io, os, datetime

report_bp = Blueprint('report', __name__)

@report_bp.route('/report', methods=['POST'])
def generate_report():
    try:
        from reportlab.lib.pagesizes import letter
        from reportlab.lib import colors
        from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
        from reportlab.lib.units import inch
        from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
        from reportlab.lib.enums import TA_CENTER, TA_LEFT

        data     = request.json
        results  = data.get('results', [])
        pat_name = data.get('patientName', 'Patient')
        pat_age  = data.get('patientAge', 'N/A')
        pat_sex  = data.get('patientSex', 'N/A')

        buf = io.BytesIO()
        doc = SimpleDocTemplate(buf, pagesize=letter,
                                leftMargin=0.75*inch, rightMargin=0.75*inch,
                                topMargin=0.75*inch, bottomMargin=0.75*inch)

        styles = getSampleStyleSheet()
        GREEN  = colors.HexColor('#006633')
        RED    = colors.HexColor('#cc0000')
        AMBER  = colors.HexColor('#cc7700')
        LGREY  = colors.HexColor('#f0f4f0')

        title_style = ParagraphStyle('title', fontSize=20, textColor=GREEN,
                                     alignment=TA_CENTER, fontName='Helvetica-Bold', spaceAfter=6)
        sub_style   = ParagraphStyle('sub', fontSize=11, textColor=colors.HexColor('#444444'),
                                     alignment=TA_CENTER, spaceAfter=4)
        h2_style    = ParagraphStyle('h2', fontSize=13, textColor=GREEN,
                                     fontName='Helvetica-Bold', spaceBefore=14, spaceAfter=6)
        body_style  = ParagraphStyle('body', fontSize=10, textColor=colors.HexColor('#333333'),
                                     leading=16, spaceAfter=4)
        tip_style   = ParagraphStyle('tip', fontSize=9, textColor=colors.HexColor('#555555'),
                                     leftIndent=12, leading=14)

        story = []

        # Header
        story.append(Paragraph('MedPredict AI', title_style))
        story.append(Paragraph('Multiple Disease Prediction Report', sub_style))
        story.append(Paragraph(f'Generated: {datetime.datetime.now().strftime("%d %B %Y, %I:%M %p")}', sub_style))
        story.append(HRFlowable(width='100%', thickness=2, color=GREEN))
        story.append(Spacer(1, 12))

        # Patient info table
        story.append(Paragraph('Patient Information', h2_style))
        pat_table = Table([
            ['Name', pat_name, 'Age', pat_age],
            ['Sex',  pat_sex,  'Date', datetime.date.today().strftime('%d/%m/%Y')],
        ], colWidths=[1.2*inch, 2.5*inch, 1.2*inch, 2.1*inch])
        pat_table.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), LGREY),
            ('BACKGROUND', (0,0), (0,-1), GREEN),
            ('BACKGROUND', (2,0), (2,-1), GREEN),
            ('TEXTCOLOR',  (0,0), (0,-1), colors.white),
            ('TEXTCOLOR',  (2,0), (2,-1), colors.white),
            ('FONTNAME',   (0,0), (-1,-1), 'Helvetica'),
            ('FONTSIZE',   (0,0), (-1,-1), 10),
            ('PADDING',    (0,0), (-1,-1), 8),
            ('GRID',       (0,0), (-1,-1), 0.5, colors.white),
        ]))
        story.append(pat_table)
        story.append(Spacer(1, 16))

        # Results
        story.append(Paragraph('Prediction Results', h2_style))
        story.append(HRFlowable(width='100%', thickness=1, color=colors.HexColor('#ccddcc')))
        story.append(Spacer(1, 8))

        for r in results:
            disease  = r.get('disease', '')
            result   = r.get('result', '')
            prob     = r.get('probability', 0)
            risk     = r.get('risk_level', 'Low')
            tips     = r.get('tips', [])
            detected = r.get('prediction', 0) == 1

            risk_color = RED if risk == 'High' else AMBER if risk == 'Moderate' else colors.HexColor('#006633')

            res_table = Table([
                [f'Disease: {disease}', f'Risk: {risk}', f'Probability: {prob}%'],
                [f'Result: {result}', '', ''],
            ], colWidths=[3*inch, 2*inch, 2*inch])
            res_table.setStyle(TableStyle([
                ('BACKGROUND', (0,0), (-1,0), GREEN if not detected else RED),
                ('BACKGROUND', (0,1), (-1,1), colors.HexColor('#f8fff8') if not detected else colors.HexColor('#fff0f0')),
                ('TEXTCOLOR',  (0,0), (-1,0), colors.white),
                ('TEXTCOLOR',  (0,1), (-1,1), colors.HexColor('#333333')),
                ('FONTNAME',   (0,0), (-1,-1), 'Helvetica-Bold'),
                ('FONTSIZE',   (0,0), (-1,-1), 10),
                ('PADDING',    (0,0), (-1,-1), 9),
                ('GRID',       (0,0), (-1,-1), 0.5, colors.HexColor('#dddddd')),
                ('SPAN',       (0,1), (2,1)),
            ]))
            story.append(res_table)

            if tips:
                story.append(Spacer(1, 4))
                story.append(Paragraph('Health Recommendations:', ParagraphStyle('tiphead', fontSize=9,
                             fontName='Helvetica-Bold', textColor=GREEN, spaceBefore=4)))
                for tip in tips:
                    story.append(Paragraph(f'• {tip}', tip_style))
            story.append(Spacer(1, 14))

        # Summary table
        story.append(HRFlowable(width='100%', thickness=1, color=colors.HexColor('#ccddcc')))
        story.append(Paragraph('Summary', h2_style))
        sum_rows = [['Disease', 'Result', 'Probability', 'Risk Level']]
        for r in results:
            sum_rows.append([r.get('disease',''), r.get('result',''),
                             f"{r.get('probability',0)}%", r.get('risk_level','')])
        sum_table = Table(sum_rows, colWidths=[1.8*inch, 2.5*inch, 1.5*inch, 1.2*inch])
        sum_table.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,0), GREEN),
            ('TEXTCOLOR',  (0,0), (-1,0), colors.white),
            ('FONTNAME',   (0,0), (-1,0), 'Helvetica-Bold'),
            ('FONTNAME',   (0,1), (-1,-1), 'Helvetica'),
            ('FONTSIZE',   (0,0), (-1,-1), 10),
            ('PADDING',    (0,0), (-1,-1), 8),
            ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, LGREY]),
            ('GRID',       (0,0), (-1,-1), 0.5, colors.HexColor('#cccccc')),
        ]))
        story.append(sum_table)
        story.append(Spacer(1, 20))

        # Disclaimer
        story.append(HRFlowable(width='100%', thickness=1, color=colors.HexColor('#ccddcc')))
        story.append(Spacer(1, 8))
        story.append(Paragraph(
            '<b>Disclaimer:</b> This report is generated by an AI system for educational purposes only. '
            'It should not be used as a substitute for professional medical advice, diagnosis, or treatment. '
            'Always consult a qualified healthcare provider for medical decisions.',
            ParagraphStyle('disclaimer', fontSize=8, textColor=colors.HexColor('#888888'),
                          leading=12, borderPad=6)))

        doc.build(story)
        buf.seek(0)
        return send_file(buf, mimetype='application/pdf',
                        as_attachment=True, download_name='MedPredict_Report.pdf')
    except ImportError:
        return jsonify({'error': 'reportlab not installed'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500
