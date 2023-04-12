package instudy.instudy.service;

import instudy.instudy.domain.Board;
import instudy.instudy.repository.BoardRepository;

public class BoardService {

    private final BoardRepository boardRepository;

    public BoardService(BoardRepository boardRepository) {
        this.boardRepository = boardRepository;
    }

    public void fileSave(Board board) {
        Board b = new Board();
        b.setFileName(board.getFileName());
        b.setFileOriginalName(board.getFileOriginalName());
        b.setFileUrl(board.getFileUrl());

        boardRepository.save(b);

    }

}
