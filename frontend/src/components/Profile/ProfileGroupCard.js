import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ProfileGroupCard = (props) => {
    console.log(props)

    function handleClick() {
        window.location.href = props.path;
    }
    
    return (
        <>
        <Container>
            <div class="card">
            <div class="card-body">
                {props.name}
                <div className="col-12">
                    <button type="button" className="btn btn-primary" onClick={handleClick}>그룹으로 이동</button>
                </div>
                </div>
            </div>
            </Container>
        </>
    );
};

export default ProfileGroupCard;