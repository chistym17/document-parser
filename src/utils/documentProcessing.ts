import axios from 'axios';

export const handleFileProcessing = async (
  actionId: string, 
  uploadedFile: File | null,
  setExtractedContent: (content: string | null) => void
) => {
  if (actionId === 'extract-text') {
    try {
      const formData = new FormData();
      if (!uploadedFile) return;
      
      formData.append('file', uploadedFile);
      
      const response = await axios.post('http://localhost:8000/api/extraction/upload-and-extract', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data && response.data.status === 'success') {
        setExtractedContent(response.data.text);
      }
    } catch (error: any) {
      console.error('Error during extraction:', error);
      alert(error.response?.data?.detail || 'Error processing file');
    }
  } else if (actionId === 'summarize') {
    try {
      const formData = new FormData();
      if (!uploadedFile) return;
      formData.append('file', uploadedFile);
      
      const extractionResponse = await axios.post('http://localhost:8000/api/extraction/upload-and-extract', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (extractionResponse.data && extractionResponse.data.status === 'success') {
        const summaryResponse = await axios.post('http://localhost:8000/api/summarize/summarize-text', {
          text: extractionResponse.data.text
        });

        if (summaryResponse.data && summaryResponse.data.status === 'success') {
          setExtractedContent(summaryResponse.data.summary);
        }
      }
    } catch (error: any) {
      console.error('Error during summarization:', error);
      alert(error.response?.data?.detail || 'Error processing file');
    }
  } else if (actionId === 'sentiment') {
    try {
      const formData = new FormData();
      if (!uploadedFile) return;
      formData.append('file', uploadedFile);
      
      const extractionResponse = await axios.post('http://localhost:8000/api/extraction/upload-and-extract', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (extractionResponse.data && extractionResponse.data.status === 'success') {
        const sentimentResponse = await axios.post('http://localhost:8000/api/sentiment/analyze-sentiment', {
          text: extractionResponse.data.text
        });

        if (sentimentResponse.data && sentimentResponse.data.status === 'success') {
          setExtractedContent(
            `Document Sentiment: ${sentimentResponse.data.sentiment}\n` +
            `Confidence Score: ${(sentimentResponse.data.confidence * 100).toFixed(2)}%\n` +
            `Rating: ${sentimentResponse.data.score}/5`
          );
        }
      }
    } catch (error: any) {
      console.error('Error during sentiment analysis:', error);
      alert(error.response?.data?.detail || 'Error analyzing sentiment');
    }
  } else if (actionId === 'key-points') {
    try {
      const formData = new FormData();
      if (!uploadedFile) return;
      formData.append('file', uploadedFile);
      
      const extractionResponse = await axios.post('http://localhost:8000/api/extraction/upload-and-extract', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (extractionResponse.data && extractionResponse.data.status === 'success') {
        const keywordResponse = await axios.post('http://localhost:8000/api/extraction/extract-keywords', {
          text: extractionResponse.data.text
        }); 

        console.log(keywordResponse.data);

        if (keywordResponse.data && keywordResponse.data.status === 'success') {        
          
          setExtractedContent(keywordResponse.data.key_points);
        }
      }
    } catch (error: any) {
      console.error('Error during keyword extraction:', error);
      alert(error.response?.data?.detail || 'Error extracting keywords');
    }
  }
}; 