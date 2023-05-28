import React, { useState } from 'react';
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import {Stack} from "@mui/material";
import {Box, Button, Typography} from "@material-ui/core";

function MKButton(props: { color: string, onClick: *, variant: string, type: string, children: ReactNode }) {
    return null;
}

const ImageUpload = () => {
    //const [selectedFile, setSelectedFile] = useState(null);
    const [image, setImage] = useState({ preview: '', data: '' });

    const handleFileChange = (e) => {
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        }
        console.log((img))
        setImage(img);
    };

    const handleUpload = async (e) => {
        // 서버로 파일 전송 로직 구현
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image.data);

        // if (selectedFile) {
        //     const formData = new FormData();
        //     //Object.values(selectedFile).forEach((selectedFile)=>formData.append("image",selectedFile))
        //     formData.append('image', selectedFile);
        //     console.log(formData)

            axios
                .post("/image/upload", formData
                )
                .then((response) => {
                    alert(response.data)
                    setImage({ preview: '', data: '' });
                }).catch((error) => {
                    console.log(error)
            });

            // axios 또는 fetch 등을 사용하여 formData를 서버로 전송
            // 예시: axios.post('/upload', formData).then(response => { ... }).catch(error => { ... });
        // }
    };

    return (
        // <div>
        //     <input type="file" multiple="multiple" onChange={handleFileChange} />
        //     <button onClick={handleUpload}>Upload</button>
        //     {/*<form method="post" encType="multipart/form-data">*/}
        //     {/*    <input type="file" multiple="multiple" name="files"  onChange={handleFileChange}/>*/}
        //     {/*    <input type="submit" onClick={handleUpload}/>*/}
        //     {/*</form>*/}
        // </div>
        <FormControl>
            <Stack>
                <form method="post" encType="multipart/form-data">
                <input className='form-control' type='file' multiple="multiple" name='file' onChange={handleFileChange}></input>
                </form>
            </Stack>
            {/*<Box my={3}>*/}
            {/*    <img src={image.preview} width='300' height='300' />*/}
            {/*</Box>*/}
            <Button
                variant="contained"
                color='primary'
                type='submit'
                onClick={handleUpload}
            >업로드 하기
            </Button>
        </FormControl>
    );
};

export default ImageUpload;