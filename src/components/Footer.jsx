import '../components/Footer.css'
import github from '../assets/github.png'

const Footer = () => {
  return (
    <div className='footer'>
      <p>Follow me on | </p>
      <a href="https://github.com/satyajeetsinghz">
        <img src={github} alt="" className='github-logo' />
      </a>
    </div>
  )
}

export default Footer
