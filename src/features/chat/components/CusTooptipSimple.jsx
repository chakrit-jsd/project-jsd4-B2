import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';

const CusTooptipSimple =({ children, content, positon, className = '' }) => {
  return (
    <>
      <Tooltip
        title={<span>{content}</span>}
        arrow={true}
        placement={positon}
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 300 }}
        // onOpen={getWholiked}
        className={className}
        // style={{ top: 0 }}
        >
        { children }
      </Tooltip>
    </>
  )
}

export default CusTooptipSimple
