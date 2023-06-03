import ProfileGroupCard from "../../../Profile/ProfileGroupCard";
import * as React from "react";
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';

const MemoList = ({ onModify, onDelete, memos }) => {
    console.log("memos", memos)
    return (
        <div>
            <b>{memos.length}</b>개의 댓글
            <TableContainer
                // component={Paper}
            >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableBody>
                {
                    memos.map((memo) => (
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {memo}
                            </TableCell>
                        </TableRow>
                    ))
                }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default MemoList;