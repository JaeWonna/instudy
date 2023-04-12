

const TodoCreate = ({ onCreate }) => {

    return (
        // <div className="TodoCreate">
        //     <text>할 일 추가</text>
        // </div>
        <form className="row row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2">
            {/*<div className="col-12">*/}
            {/*    <div className="form-outline">*/}
            {/*        <input type="text" id="form1" className="form-control"/>*/}
            {/*        <label className="form-label" htmlFor="formTextExample1">Example label</label>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className="col-12">
            <input className="form-control" type="text" placeholder="Default input" aria-label="default input example"/>
            </div>
            <div className="col-12">
                <button type="submit" className="btn btn-primary">Save</button>
            </div>

            <div className="col-12">
                <button type="submit" className="btn btn-warning">Get tasks</button>
            </div>
        </form>
    );
};

export default TodoCreate;