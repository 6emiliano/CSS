import './titulo.css'
import banner from '../../img/banner.webp'
const Titulo = ({ texto }) => {
    const styles = {
        color: 'blue',
        backgroundColor: 'lightgray',
        padding: '10px',
        borderRadius: '5px',
        textAlign: 'center'
    };

    return (
      <div>
        <h2 className="titulo-h2">Bienvenidos al curso de react</h2>
        <img calssName="titulo-banner" src={banner} alt="" />
    </div>
    )

}

export default Titulo

