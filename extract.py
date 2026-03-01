import sys
try:
    import PyPDF2
    with open(sys.argv[1], 'rb') as f:
        reader = PyPDF2.PdfReader(f)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
    print(text)
except ImportError:
    try:
        import fitz
        doc = fitz.open(sys.argv[1])
        text = ""
        for page in doc:
            text += page.get_text()
        print(text)
    except ImportError:
        print("No PyPDF2 or fitz found")
except Exception as e:
    print(f"Error: {e}")
