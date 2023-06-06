import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const MemoList = ({ onModify, onDelete, memos }) => {
    console.log("memos", memos);
    return (
        <div>
            <b>{memos.length}</b>개의 댓글

            {/*<TableContainer*/}
            {/*    style={{ width: "100%", overflowX: "hidden" }} // Add this style*/}
            {/*>*/}
            {/*    <Table sx={{ minWidth: 650 }} aria-label="simple table">*/}
            {/*        <TableBody>*/}
            {/*            {memos.map((memo) => (*/}
            {/*                <TableRow*/}
            {/*                    key={memo.id} // Make sure to provide a unique key*/}
            {/*                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}*/}
            {/*                >*/}
            {/*                    <TableCell component="th" scope="row">*/}
            {/*                        {memo.content} /!* Render the specific property of the memo object *!/*/}
            {/*                    </TableCell>*/}
            {/*                </TableRow>*/}
            {/*            ))}*/}
            {/*        </TableBody>*/}
            {/*    </Table>*/}
            {/*</TableContainer>*/}

            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {memos.map((memo) => (
                <ListItem alignItems="flex-start" key={memo.id}>
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                        primary={memo.content}
                        secondary={
                            <React.Fragment>
                                {" — 익명"}
                            </React.Fragment>
                        }
                    />
                </ListItem>
                // <Divider variant="inset" component="li" />
                    ))}
            </List>

        </div>
    );
};

export default MemoList;
