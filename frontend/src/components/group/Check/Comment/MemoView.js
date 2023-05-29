import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AddMemo from '../../Check/Comment/AddMemo';
import MemoList from '../../Check/Comment/MemoList';

const App = () => {
    const [memos, setMemos] = useState([
        {
            id: 1,
            title: '메모1',
            content: '내용1',
            date: new Date().getTime()
        },
        {
            id: 2,
            title: '메모2',
            content: '내용2',
            date: new Date().getTime()
        },
        {
            id: 3,
            title: '메모3',
            content: '내용3',
            date: new Date().getTime()
        }
    ]);

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
                        <AddMemo memos={memos} setMemos={setMemos}/>
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