import * as React from 'react';
import { useContext, useState } from 'react';
import Button from '@mui/joy/Button';
import { UpdateContext } from "../public/businessDetails"
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import PhoneIcon from '@mui/icons-material/Phone';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import PlaceIcon from '@mui/icons-material/Place';
import EmailIcon from '@mui/icons-material/Email';
import { useForm } from 'react-hook-form';
import { observer } from "mobx-react-lite";
import business from '../../data/business';
import ImageIcon from '@mui/icons-material/Image';

const UpdateDetails = observer(() => {

    const setOpen = useContext(UpdateContext).setOpen;
    const { register, handleSubmit, reset } = useForm();

    function update(data) {
        console.log(data);
        setOpen(false);
        business.postBusiness(data);
    };
    return (<>
        <form onSubmit={handleSubmit(update)}>
            <Card
                variant="outlined"
                sx={{
                    maxHeight: 'max-content',
                    maxWidth: '100%',
                    mx: 'auto',
                    // to make the demo resizable
                    overflow: 'auto',
                    resize: 'horizontal',
                }}
            >
                <Typography level="title-lg" startDecorator={<InfoOutlined />}>
                    Fill the business details
                </Typography>
                <Divider inset="none" />
                <CardContent
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, minmax(80px, 1fr))',
                        gap: 1.5,
                    }}
                >
                    <FormControl >
                        <FormLabel>Business name</FormLabel>
                        <Input
                            endDecorator={<BusinessIcon />}
                            {...register("name")}
                            defaultValue={business.business.name}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Owner name</FormLabel>
                        <Input

                            endDecorator={<PersonIcon />}
                            {...register("owner")}
                            defaultValue={business.business.owner}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Addres</FormLabel>
                        <Input
                            endDecorator={<PlaceIcon />}
                            {...register("address")}
                            defaultValue={business.business.address}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Phone</FormLabel>
                        <Input
                            type="tel"
                            endDecorator={<PhoneIcon />}
                            {...register("phone")}
                            defaultValue={business.business.phone}
                        />
                    </FormControl>
                    <FormControl sx={{ gridColumn: '1/-1' }}>
                        <FormLabel>E-mail</FormLabel>
                        <Input
                            type="email"
                            endDecorator={<EmailIcon />}
                            {...register("description")}
                            defaultValue={business.business.description}
                        />
                    </FormControl>
                    <FormControl sx={{ gridColumn: '1/-1' }}>
                        <FormLabel>Logo</FormLabel>
                        <Input
                            endDecorator={<ImageIcon />}
                            {...register("logo")}
                            defaultValue={business.business.logo}
                        />
                    </FormControl>
                    <CardActions sx={{ gridColumn: '1/-1' }}>
                        <Button type="submit" variant="solid" sx={{
                            backgroundColor: '#77474b',
                            '&:hover': {
                                backgroundColor: '#202123',
                            },
}}>
                            Save
                        </Button>
                    </CardActions>
                </CardContent>
            </Card>
        </form>
    </>)
});
export default UpdateDetails;
