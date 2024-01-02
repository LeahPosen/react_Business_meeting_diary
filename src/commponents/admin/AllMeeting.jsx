import { observer } from "mobx-react-lite";
import meeting from '../../data/meeting ';
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useMemo} from'react';
import dayjs from "dayjs";
function getColor(dateTime) {
    const meetingDate = new Date(dateTime);
    const meetingDateStr = meetingDate.getFullYear() + '-' + (meetingDate.getMonth() + 1) + '-' + meetingDate.getDate();

    const now = new Date();
    const nowStr = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();

    if (meetingDateStr === nowStr) {
        return 'red'; 
    } else if (meetingDate >= now && meetingDate < new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7)) {
        return 'orange'; 
    } else {
        return 'green'; 
    }
}
const AllMeeting = observer(() => {
    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const sortedMeetings = useMemo(() => {
        const now = dayjs();
        let meetings = [...meeting.meetingsList];
        meetings = meetings.filter((m) => dayjs(m.dateTime).isAfter(now) || dayjs(m.dateTime).isSame(now));
        return meetings.sort((a, b) =>
            dayjs(a.dateTime).isAfter(dayjs(b.dateTime)) ? 1 : -1
        );
    }, [meeting.meetingsList]);
    return (<>
        {sortedMeetings.map((m, index) => (
            <Accordion expanded={expanded === 'panel' + index} onChange={handleChange('panel' + index)}
                sx={{ width: '115%', transform: 'translate(-7vw, 0)' }} key={index}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    sx={{ display: 'flex', alignItems: 'center' }} // Align items vertically
                >
                    <Typography
                        sx={{
                            width: '33%',
                            flexShrink: 0,
                            textAlign: 'left', color: getColor(m.dateTime),
                        }}>
                        {m.serviceName}
                    </Typography>
                    <Typography sx={{ ml: 4, color: 'text.secondary' }}>{m.clientName}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography sx={{ textAlign: 'left' }}>
                        Date: {m.dateTime}<br></br>
                        Phone: {m.clientPhone}<br></br>
                        E-Mail: {m.clientEmail}<br></br>
                    </Typography>
                </AccordionDetails>
            </Accordion>
        ))}
    </>)
});
export default AllMeeting;
// import { observer } from "mobx-react-lite";
// import meeting from '../../data/meeting ';
// import * as React from 'react';
// import Accordion from '@mui/material/Accordion';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import Typography from '@mui/material/Typography';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// // import { format } from 'date-fns'; // Import for date formatting

// const AllMeeting = observer(() => {
//   const [expanded, setExpanded] = React.useState(false);
//   const handleChange = (panel) => (event, isExpanded) => {
//     setExpanded(isExpanded ? panel : false);
//   };

//   const today = new Date(); // Get today's date
//   const currentDate = format(today, 'yyyy-MM-dd'); // Format today's date

//   return (
//     <>
//       {meeting.meetingsList.map((m, index) => (
//         <Accordion
//           expanded={expanded === 'panel' + index}
//           onChange={handleChange('panel' + index)}
//           sx={{ width: "80vw" }}
//           key={index}
//         >
//           <AccordionSummary
//             expandIcon={<ExpandMoreIcon />}
//             aria-controls="panel1bh-content"
//             id="panel1bh-header"
//             sx={{ display: 'flex', alignItems: 'center' }}
//           >
//             <Typography
//               sx={{
//                 width: '33%',
//                 flexShrink: 0,
//                 textAlign: 'left',
//                 color: getColor(m.dateTime), // Apply color based on date
//               }}
//             >
//               {m.serviceName}
//             </Typography>
//             <Typography sx={{ ml: 4, color: 'text.secondary' }}>
//               {m.clientName}
//             </Typography>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Typography sx={{ textAlign: 'left' }}>
//               Date: {m.dateTime}<br></br>
//               Phone: {m.clientPhone}<br></br>
//               E-Mail: {m.clientEmail}<br></br>
//             </Typography>
//           </AccordionDetails>
//         </Accordion>
//       ))}
//     </>
//   );
// });

// export default AllMeeting;

// // Function to determine color based on date
// function getColor(dateTime) {
//   const meetingDate = new Date(dateTime);
//   const meetingDateStr = format(meetingDate, 'yyyy-MM-dd');

//   if (meetingDateStr === currentDate) {
//     return 'red'; // Today's meetings in red
//   } else if (meetingDate >= today && meetingDate < new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7)) {
//     return 'orange'; // This week's meetings in orange
//   } else {
//     return 'green'; // Other meetings in green
//   }
// }
