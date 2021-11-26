import './preview.css';
import { useRef, useEffect } from 'react';

interface PreviewProps {
  code: string;
  err: string;
}

const template = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>html { background-color: white; }</style>
  </head>
  <body>

    <div id="root"></div>
    
    <script>
      const errorHandler = (err) => {
        const root = document.querySelector('#root');
        root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
        console.error(err);
      }

      window.addEventListener('error', (e) => {
        e.preventDefault();
        errorHandler(e.error)
      })

      window.addEventListener('message', (e) => {
        try {
          eval(e.data);
        } catch (err) {
          errorHandler(err)
        }
      }, false)
    </script>
  </body>
  </html>
`;

const Preview: React.FC<PreviewProps> = ({ code, err }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcDoc = template;
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, '*');
    }, 50);
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        title="preview"
        ref={iframe}
        sandbox="allow-scripts"
        srcDoc={template}
      ></iframe>
      {err && <div className="preview-err">{err}</div>}
    </div>
  );
};

export default Preview;
