import React, { useState, useEffect } from "react";
import {text} from '../assets/method_file.js';
import { Document , Page, pdfjs} from 'react-pdf'
import styled from "styled-components";
import file from "../assets/LOCUS.pdf";

export default function Map() {

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  
    function onDocumentLoadSuccess({ numPages }) {
      setNumPages(numPages);
    }

    return (
        <StyledPDFDiv>
            <PDFContainer>
                <Document
                    file={file}
                    onLoadSuccess={onDocumentLoadSuccess}
                >
                    <Page pageNumber={1} />
                    <Page pageNumber={2} />
                    <Page pageNumber={3} />
                    <Page pageNumber={4} />
                    <Page pageNumber={5} />
                    <Page pageNumber={6} />
                </Document>
            </PDFContainer>
          {/* <p>Page {pageNumber} of {numPages}</p> */}
        </StyledPDFDiv>
      );
}

{/* <StyledTextBody>
            <a>
                {text}
            </a>
        </StyledTextBody> */}

export const StyledPDFDiv = styled.div`
background-color: #bbb;
text-align: center;
align-content: center;
margin-right:10;
width: 100%;
`

export const PDFContainer = styled.div`
background-color: #fff;
margin-right:auto;
margin-left:auto;
width:595px;
box-shadow: 0 0 30px #000;
`

export const StyledTextBody = styled.div`
// top: 0;
// left: 0;
margin: 0 auto;
display: flex;
flex-direction: row;
justify-content: space-between;
z-index: 1000;
a {
  margin-left: 3rem;
  margin-right: 3rem;
  margin-top: 6rem;
  font-family: "Times New Roman", Times, serif;
  text-align: justify;
}
`;