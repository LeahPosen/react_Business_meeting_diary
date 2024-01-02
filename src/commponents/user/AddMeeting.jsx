import { useContext, useState, useEffect } from "react"
import { MeetingContext } from '../public/Service';
import Button from '@mui/joy/Button';
import { Alert } from '@mui/material';
import * as React from 'react';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import { useForm } from 'react-hook-form';
import AspectRatio from '@mui/joy/AspectRatio';
import CardOverflow from '@mui/joy/CardOverflow';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import service from '../../data/service ';
import meeting from '../../data/meeting '
import EventIcon from '@mui/icons-material/Event';
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";

const AddMeeting = observer(() => {
    const { register, handleSubmit, reset, setValue } = useForm();
    const [isDateAvailable, setIsDateAvailable] = useState(true);
    const [selectedService, setSelectedService] = useState("");
    const setOpen = useContext(MeetingContext).setOpen;
  
    const update = async (data) => {
        try {
            const status = await meeting.postMeeting(data);
            console.log(status);
            if (status === 200) {
                setOpen(false);
                reset();
            }
        } catch (error) {
            setIsDateAvailable(false);
            setValue('dateTime', '');
            console.log("aaaaa");
        }
    };

    return (<form onSubmit={handleSubmit(update)}>
        <Card
            data-resizable
            sx={{
                textAlign: 'center',
                alignItems: 'center',
                width: 343,
                overflow: 'auto',
                resize: 'horizontal',
                '--icon-size': '100px',
            }}
        >
            <CardOverflow variant="solid" sx={{ color: "#202123" }}>
                <AspectRatio
                    variant="outlined"
                    color="#202123"
                    ratio="1"
                    sx={{
                        color:"#202123",
                        m: 'auto',
                        transform: 'translateY(50%)',
                        borderRadius: '50%',
                        width: 'var(--icon-size)',
                        boxShadow: 'sm',
                        bgcolor: 'background.surface',
                        position: 'relative',
                    }}
                >
                    <div>
                        <EventIcon color="#77474b" sx={{ fontSize: '4rem' }}></EventIcon>
                    </div>
                </AspectRatio>
            </CardOverflow>
            <Typography level="title-lg" sx={{ mt: 'calc(var(--icon-size)/2)' }}>
                Fill the business details
            </Typography>
            <CardContent sx={{ maxWidth: '40ch' }}>
                <FormControl sx={{ minWidth: 120 }}>
                    <FormLabel>Service name</FormLabel>
                    <Select sx={{ height: 40 }}
                        defaultValue={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        {...register("serviceName")}
                        required
                    >
                        <MenuItem value="">None</MenuItem>
                        {service.servicesList.map((object, index) => (
                            <MenuItem key={index} value={object.name}>{object.name}</MenuItem>))}
                    </Select>
                </FormControl>
                <FormControl >
                    <FormLabel>Client name</FormLabel>
                    <Input
                        endDecorator={<PersonIcon />}
                        {...register("clientName")}
                        required
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Phone</FormLabel>
                    <Input

                        type="tel"
                        endDecorator={<PhoneIcon />}
                        {...register("clientPhone")}
                    />
                </FormControl>
                <FormControl >
                    <FormLabel>E-mail</FormLabel>
                    <Input
                        type="email"
                        endDecorator={<EmailIcon />}
                        {...register("clientEmail")}
                    />
                </FormControl>
                <FormControl >
                    <FormLabel>Date</FormLabel>
                    <Input
                        type="datetime-local"
                        {...register("dateTime")}
                        required
                    />
                    {!isDateAvailable && (
                        <Alert severity="error" sx={{ marginBottom: 2 }}>
                            Appointment is not available! Please choose a different date and time.
                        </Alert>)}
                </FormControl>
                <CardActions
                    orientation="vertical"
                    // buttonFlex={1}
                    sx={{
                        '--Button-radius': '40px',
                        width: 'clamp(min(100%, 160px), 50%, min(100%, 200px))',
                    }}
                >
                    <Button variant="solid" sx={{
                        backgroundColor: '#77474b',
                        '&:hover': {
                            backgroundColor: '#202123', // שינוי צבע הרקע בעת hover
                        },
                    }} type="submit">
                        Save
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    </form>)
});
export default AddMeeting;

// export default function UpdateDetails() {
//     const setOpen = useContext(MeetingContext).setOpen;

//     return (<>
//         {/* <DialogContent> */}
//         <Card
//             data-resizable
//             sx={{
//                 textAlign: 'center',
//                 alignItems: 'center',
//                 width: 343,
//                 // to make the demo resizable
//                 overflow: 'auto',
//                 resize: 'horizontal',
//                 '--icon-size': '100px',
//             }}
//         >
//             <CardOverflow variant="solid" color="warning">
//                 <AspectRatio
//                     variant="outlined"
//                     color="warning"
//                     ratio="1"
//                     sx={{
//                         m: 'auto',
//                         transform: 'translateY(50%)',
//                         borderRadius: '50%',
//                         width: 'var(--icon-size)',
//                         boxShadow: 'sm',
//                         bgcolor: 'background.surface',
//                         position: 'relative',
//                     }}
//                 >
//                     <div>
//                         <BakeryDiningIcon color="warning" sx={{ fontSize: '4rem' }} />
//                     </div>
//                 </AspectRatio>
//             </CardOverflow>
//             {/* <Typography level="title-lg" sx={{ mt: 'calc(var(--icon-size) / 2)' }}>
//                 🎊 Congrats Julia 🎊
//             </Typography>
//             <CardContent sx={{ maxWidth: '40ch' }}>
//                 You just gain one Cookhat for Salad cooking. Share your achievement with your
//                 friends.
//             </CardContent> */}
//             {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
//                 <DatePicker />
//             </LocalizationProvider> */}
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//                 <DemoContainer components={['DateField', 'DatePicker']}>
//                     <DatePicker
//                         label="Date Picker"
//                         format="YYYY/MM/DD"
//                         defaultValue={dayjs('2022-04-17')}
//                     />
//                 </DemoContainer>
//             </LocalizationProvider>
//             <CardActions
//                 orientation="vertical"
//                 buttonFlex={1}
//                 sx={{
//                     '--Button-radius': '40px',
//                     width: 'clamp(min(100%, 160px), 50%, min(100%, 200px))',
//                 }}
//             >

//                 <Button variant="solid" color="warning" onClick={() => setOpen(false)}>

//                 </Button>
//             </CardActions>
//         </Card>
//         {/* </DialogContent> */}
//         {/* <DialogActions>
//             <Button onClick={() => setOpen(false)}>Agree</Button>
//         </DialogActions> */}
//     </>)
// }

