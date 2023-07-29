<h1 align="center">
    Unisum - Universal Summarization Tool<br>
    <img src="https://img.shields.io/badge/License-MIT-orange">
    <img src="https://img.shields.io/badge/Status-Development-blue">
    <img src="https://img.shields.io/badge/Contributions-Open-green">
</h1>
Unisum is a versatile and powerful universal summarization tool designed to streamline the process of summarizing various types of content. Whether you need to summarize raw text, Excel files, text documents, or PDFs, Unisum has got you covered. Additionally, Unisum incorporates a unique question-answering feature, allowing you to ask specific questions related to the document you uploaded.

## Table of Contents
- [Screenshots](#screenshots)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Screenshots📷
### UI - 
![image](https://github.com/legit-programmer/unisum/assets/66078215/8cf76e2b-3eb7-4961-b888-a49066157b50)
### Raw text summarization - 
![image](https://github.com/legit-programmer/unisum/assets/66078215/25ffc6b8-e1fa-4bad-86f4-c7833c7ac0f6)

### Text document summarization
![image](https://github.com/legit-programmer/unisum/assets/66078215/f593682e-2764-46df-b7b2-af7398fe59a4)
![image](https://github.com/legit-programmer/unisum/assets/66078215/ed9a0dd3-7a38-4536-852d-d4fde126bc4a)

### Image summarization
![image](https://github.com/legit-programmer/unisum/assets/66078215/a2381884-c3da-4fa3-a4eb-60d31f6c95ea)


### More to come...!🚀





## Installation🛠

To get started with Unisum, follow these simple steps:

1. Clone the repository:
```$ git clone https://github.com/legit-programmer/unisum.git```
2. Install the required dependencies:<br>
```/server/$- pip3 install -r requirements.txt```<br>
```/app/$- npm install```
3. Setup ```.env``` file in ```/server/``` by adding ```TOKEN = <YOUR HUGGING FACE HUB TOKEN HERE>```. [Get your token here](https://huggingface.co/)

## Usage💻

Unisum offers a user-friendly interface and easy-to-use functionalities. Follow the instructions below to utilize its features effectively:
1. Launch Unisum by running the following command:<br>
```/server/$- python3 manage.py runserver```<br>
```/app/$- npm run dev```
2. Access Unisum in your preferred web browser at [http://localhost:5173](http://localhost:5173)
3. Upload the document you wish to summarize. Unisum supports a wide range of file formats, including raw text, Excel files, text documents  and PDFs. [see currently supported documents](#features)
4. If desired, utilize the question-answering feature to obtain specific answers related to the document content. Simply enter your question, and Unisum will provide the most relevant response.

## Features✨

Unisum offers a comprehensive set of features that sets it apart from other summarization tools:

- **Universal Summarization:** Unisum supports a wide range of file formats, including raw text, Excel files, text documents, and PDFs. You can easily summarize any type of content without switching between different tools.

- **Question-Answering:** Unisum incorporates an intelligent question-answering capability, allowing you to ask specific questions related to the uploaded document. Obtain accurate and relevant answers effortlessly.

- **User-Friendly Interface:** The intuitive and user-friendly interface of Unisum ensures a seamless and enjoyable user experience. Easily navigate through the tool and access all its features without any hassle.

#### Currently Supported Documents:
| Document Type | Summary | Qna |
| ------------- | ------ | --- |
| Raw text | ✔ | ✔ |
| Text document | ✔ | ✔ |
| Image | ✔ | ✔ |
| Pdf | ✔ | ✔ |
| Excel file | ❌ | ❌ |

## Contributing💖

We welcome contributions from the community to make Unisum even better. If you would like to contribute, please follow these guidelines:

1. Fork the repository and create a new branch.

2. Make your changes and ensure they align with the project's coding style and conventions.

3. Write clear and concise commit messages.

4. Test your changes thoroughly.

5. Submit a pull request describing the changes you made and their purpose.

## License📃

This project is licensed under the [MIT License](LICENSE). Feel free to use and modify the code as per the license terms.
