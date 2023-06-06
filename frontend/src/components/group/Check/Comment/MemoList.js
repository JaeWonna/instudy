import ProfileGroupCard from "../../../Profile/ProfileGroupCard";
import * as React from "react";
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';

const MemoList = ({ onModify, onDelete, memos }) => {
    console.log("memos", memos);
    return (
        <div>
            <b>{memos.length}</b>개의 댓글
            <TableContainer
                style={{ width: "100%", overflowX: "hidden" }} // Add this style
            >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableBody>
                        {memos.map((memo) => (
                            <TableRow
                                key={memo.id} // Make sure to provide a unique key
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {memo.content} {/* Render the specific property of the memo object */}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default MemoList;
