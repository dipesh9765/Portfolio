import sys
try:
    import PyPDF2
    with open(sys.argv[1], 'rb') as f:
        reader = PyPDF2.PdfReader(f)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
    with open('resume_utf8.txt', 'w', encoding='utf-8') as out:
        out.write(text)
except ImportError:
    try:
        import fitz
        doc = fitz.open(sys.argv[1])
        text = ""
        for page in doc:
            text += page.get_text()
        with open('resume_utf8.txt', 'w', encoding='utf-8') as out:
            out.write(text)
    except ImportError:
        pass
