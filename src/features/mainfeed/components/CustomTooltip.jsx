import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';
import { getWhoLikedCard } from '../../../services/API/cardsAPI';
import { Link } from 'react-router-dom';
import '../../../assets/styles/customTooltip.css'


const TooltipTitle = ({ whoLiked }) => {

  return (
    <div className='tootip-detail'>
      {whoLiked.length > 0 ? whoLiked?.map((who) => {
        const { profilename, firstname, lastname, smallImgUrl, _id } = who
        return (
          <div key={_id} className='who-liked-link'>
            <Link to={`/another/${_id}`} >
              <img src={smallImgUrl || 'https://via.placeholder.com/20'} alt='profile-img'/>
              <span>{profilename || `${firstname}  ${lastname}`}</span>
            </Link>
          </div>
        )
      }) : null}
    </div>
  )
}


const CustomTooltip = ({ children, cardId, likedCount, whoLiked, setWhoLiked }) => {
  const getWholiked = async () => {
    if (whoLiked.length > 0 && whoLiked.length === likedCount) return
    try {
      const res = await getWhoLikedCard(cardId)
      // console.log(res)
      setWhoLiked(res.data?.whoLiked)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      {
      likedCount > 0 ?
      <Tooltip
        title={<TooltipTitle whoLiked={whoLiked} />}
        placement="right-end"
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 600 }}
        onOpen={getWholiked}
        className='container-tooltip'
        >
        { children }
      </Tooltip>
      : children }
    </>
  )
}

export default CustomTooltip
