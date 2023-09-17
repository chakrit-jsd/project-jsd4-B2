import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';

const CusTooptip =({ children, time }) => {
  return (
    <>
      <Tooltip
        title={<span>{new Date(time).toLocaleString('en-GB')}</span>}
        placement="left-start"
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 300 }}
        // onOpen={getWholiked}
        className='container-tooltip-chat-time'
        >
        { children }
      </Tooltip>
    </>
  )
}

export default CusTooptip
