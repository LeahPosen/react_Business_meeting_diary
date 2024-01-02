import Grid from '@mui/material/Grid';
import Service from "./Service"
import { observer } from "mobx-react-lite";
import service from '../../data/service ';
const allServices = observer(() => {
    return (<>
        <Grid container spacing={1} sx={{ width: '115%', transform: 'translate(-7vw, 0)', display: "flex", justifyContent: "space-between", backgroundColor:"#202123"}} >
            {service.servicesList.map((object, index) => (
                <Grid item key={index}>
                    <Service s={object} />
                </Grid>
            ))}
        </Grid>
        
    </>)
});
export default allServices;

