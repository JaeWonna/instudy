import React, { useState } from 'react';
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import {Stack} from "@mui/material";
import {Box, Button, Typography} from "@material-ui/core";

function MKButton(props: { color: string, onClick: *, variant: string, type: string, children: ReactNode }) {
    return null;
}

const ImageUpload = ({getImageId}) => {
    const [image, setImage] = useState({ preview: '', data: '' });
    const [imageId, setImageId] = useState(0);


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

        //     axios
        //         .post("/image/upload", formData)
        //         .then((response) => {
        //             alert(response.data)
        //             setImageId(response.data);
        //             setImage({ preview: '', data: '' });
        //         }).catch((error) => {
        //             console.log(error)
        //     });
        // console.log(imageId);
        // getImageId(imageId);
        try {
            const response = await axios.post("/image/upload", formData);
            alert(response.data);
            setImageId(response.data);
           // setImage({ preview: '', data: '' });
        } catch (error) {
            console.log(error);
        }

    };

    console.log(imageId);
    getImageId(imageId);

    const componentStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

    return (
        <FormControl style={componentStyle}>
            <Stack>
                <form method="post" encType="multipart/form-data">
                <input className='form-control' type='file' multiple="multiple" name='file' onChange={handleFileChange}></input>
                </form>
            </Stack>
                <Box my={3}>
                    <img src={image.preview} width='300' height='300' />
                </Box>
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