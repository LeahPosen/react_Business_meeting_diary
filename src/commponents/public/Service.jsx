import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import Favorite from '@mui/icons-material/Favorite';
import AddMeeting from '../user/AddMeeting';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { useState, createContext, useContext } from 'react';
import Tooltip from '@mui/material/Tooltip';
import { Padding } from '@mui/icons-material';
import { IsAdminContext } from '../../App';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export const MeetingContext = createContext(null);

export default function Service({ s }) {
    const isAdmin = useContext(IsAdminContext).isAdmin;
    const [open, setOpen] = useState(false);
    const meetingContext = { open, setOpen }
    const serviceData = s;
    return (
        <Card variant="outlined" sx={{ width: "20vw", height: "35vh" }}>
            <CardOverflow>
                <AspectRatio ratio="2">
                    <img
                        src={s.image}
                        srcSet={s.image}
                        loading="lazy"
                        alt=""
                    />
                </AspectRatio>
                {!isAdmin && <Tooltip title="Order Service"><IconButton
                    aria-label="Like minimal photography"
                    size="md"
                    variant="solid"
                    color="danger"
                    sx={{
                        position: 'absolute',
                        zIndex: 2,
                        borderRadius: '50%',
                        right: '1rem',
                        bottom: 0,
                        transform: 'translateY(50%)',
                         backgroundColor: '#77474b',
                    }}
                    onClick={() => setOpen(true)}
                >
                    <Favorite  />
                </IconButton> </Tooltip>}
               
                 
               
                <React.Fragment>
                    <Dialog
                        open={open}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={() => setOpen(false)}
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogContent id="alert-dialog-slide-description" style={{ padding: 0, margin: 0 }}>
                            <MeetingContext.Provider value={meetingContext}>
                                <AddMeeting />
                            </MeetingContext.Provider>
                        </DialogContent>
                    </Dialog>
                </React.Fragment>

            </CardOverflow>
            <CardContent>
                <Typography level="title-md">
                    {serviceData.name}
                </Typography>
                <Typography level="body-sm" sx={{height:'5vh'}}>
                    {serviceData.description}
                </Typography>
            </CardContent>
            <CardOverflow variant="soft">
                <Divider inset="context" />
                <CardContent orientation="horizontal">
                    <Typography level="body-xs">
                        <b>price: </b>{serviceData.price}$
                    </Typography>
                    <Divider orientation="vertical" />
                    <Typography level="body-xs">
                        <b>duration: </b>{serviceData.duration} hours
                    </Typography>
                </CardContent>
            </CardOverflow>
        </Card>
    );
}
