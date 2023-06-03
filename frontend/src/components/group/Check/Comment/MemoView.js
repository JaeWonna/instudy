import {useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AddMemo from '../../Check/Comment/AddMemo';
import MemoList from '../../Check/Comment/MemoList';

const App = (props) => {
    const { loginUser, checkingId } = props;

    console.log("MemoView에서 loginUser", loginUser)

    const [memos, setMemos] = useState([
    ]);

    const fetchData = async () => {
        try {
            const response = await fetch('/checking/comment/read', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ checkingId: checkingId }), // Replace 'your-checking-id' with the actual checking ID
            });

            if (response.ok) {
                const commentsData = await response.json();
                setMemos(commentsData);
            } else {
                // Handle error response
                console.error('Error:', response.status);
            }
        } catch (error) {
            // Handle network error
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const onModify = (id, newTitle, newContent) => {
        setMemos(
            memos.map(memo => memo.id === id ? {...memo, title: newTitle, content: newContent} : memo)
        );
    }

    const onDelete = (id) => {
        setMemos(memos.filter(memo => memo.id !== id));
    };

    return (
        <>
            <Container>
                <Row>
                    &nbsp;
                </Row>
                <Row>
                    <Col>
                        <AddMemo memos={memos} setMemos={setMemos} loginUser={loginUser} checkingId={checkingId}/>
                    </Col>
                    <Col>
                        <MemoList memos={memos} onDelete={onDelete} onModify={onModify}/>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default App;