import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ProfileGroupCard = (props) => {
    console.log(props)
    return (
        <>
        <Container>
            <div class="card">
            <div class="card-body">
                {props.group}
                <div className="col-12">
                    <button type="button" className="btn btn-primary">그룹으로 이동</button>
                </div>
                </div>
            </div>
            </Container>
        </>
    );
};

export default ProfileGroupCard;