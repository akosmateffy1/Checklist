import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Card, CardContent, CardActions, TextField, FormControl, InputLabel, Select, MenuItem, CircularProgress, Snackbar } from '@mui/material';
import { AllTitle, ButtonUnique, CenteredContainer, Title, Image, ChecklistError, CardERR, LoadingGroup } from './ChecklistStyled';
import ServerImage from '../assets/Server-amico.png';

const statuses = ["CHECKED", "NOT_RELEVANT", "FAILED", "NOT_CHECKED"];

export default function Checklist({ driveNumber }) {
    const [checklists, setChecklists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:5000/checklists?driveNumber=${driveNumber}`)
            .then(response => {
                if (response.data.length > 0) {
                    setChecklists(response.data);
                } else {
                    setSnackbarMessage('Checklist not found');
                    setSnackbarOpen(true);
                }
                setLoading(false);
            })
            .catch(error => {
                setSnackbarMessage('Failed to load checklist');
                setSnackbarOpen(true);
                setLoading(false);
            });
    }, [driveNumber]);

    const handleStatusChange = (checklistId, occasionId, itemId, status) => {
        const updatedChecklists = checklists.map(checklist => {
            if (checklist.id === checklistId) {
                const updatedChecklist = { ...checklist };
                const occasion = updatedChecklist.checkOccasion.find(o => o.id === occasionId);
                const item = occasion.checkItem.find(i => i.code === itemId);
                item.status = status;
                return updatedChecklist;
            }
            return checklist;
        });
        setChecklists(updatedChecklists);
    };

    const handleRemarkChange = (checklistId, occasionId, itemId, remark) => {
        const updatedChecklists = checklists.map(checklist => {
            if (checklist.id === checklistId) {
                const updatedChecklist = { ...checklist };
                const occasion = updatedChecklist.checkOccasion.find(o => o.id === occasionId);
                const item = occasion.checkItem.find(i => i.code === itemId);
                item.checkResultRemark = remark;
                return updatedChecklist;
            }
            return checklist;
        });
        setChecklists(updatedChecklists);
    };

    const saveChecklist = (checklistId) => {
        const checklist = checklists.find(c => c.id === checklistId);
        axios.put(`http://localhost:5000/checklists/${checklist.id}`, checklist)
        .then(response => {
            setSnackbarMessage('Checklist saved successfully!');
            setSnackbarOpen(true);
        })
        .catch(error => {
            setSnackbarMessage('Failed to save checklist');
            setSnackbarOpen(true);
        });
    };

    if (loading) {
        return (
            <LoadingGroup>
                <CircularProgress />
            </LoadingGroup>
        );
    }

    if (checklists.length === 0) {
        return (
            <ChecklistError>
                <CardERR>
                    <Title>No checklist found. <br /> Please start the server!</Title>
                    <Image 
                        src={ServerImage} 
                        alt="Server-IMG"     
                    />
                    <AllTitle>npm run json-server</AllTitle>
                </CardERR>
            </ChecklistError>
        );
    }

    return (
        <Container>
            {checklists.map(checklist => (
                <React.Fragment key={checklist.id}>
                    <Typography
                        variant="h4" 
                        gutterBottom
                        textAlign='center'
                        fontWeight={800}
                        marginTop={3}
                        marginBottom={3}
                    >{checklist.name}</Typography>
                    {checklist.checkOccasion.map(occasion => (
                        <Card 
                            key={occasion.id} 
                            style={{ 
                                marginBottom: '20px', 
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.25)',
                                borderRadius:'15px'
                            }}
                        >
                            <CardContent>
                                <Typography 
                                    variant="h6"
                                    fontWeight={800}
                                >{checklist.title}</Typography>
                                {occasion.checkItem.map(item => (
                                    <div key={item.code} style={{ marginBottom: '20px' }}>
                                        <Typography 
                                            marginBottom={1}
                                            fontWeight={600}
                                        >{item.title}</Typography>
                                        <FormControl fullWidth variant="outlined" style={{ marginBottom: '10px' }}>
                                            <InputLabel>Status</InputLabel>
                                            <Select
                                                value={item.status}
                                                onChange={(e) => handleStatusChange(checklist.id, occasion.id, item.code, e.target.value)}
                                                label="Status"
                                            >
                                                {statuses.map(status => (
                                                    <MenuItem 
                                                        key={status} 
                                                        value={status}
                                                    >{status}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <TextField
                                            label="Remark"
                                            variant="outlined"
                                            fullWidth
                                            value={item.checkResultRemark}
                                            onChange={(e) => handleRemarkChange(checklist.id, occasion.id, item.code, e.target.value)}
                                        />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    ))}
                    <CardActions>
                        <CenteredContainer>
                            <ButtonUnique 
                                variant="contained" 
                                onClick={() => saveChecklist(checklist.id)}
                            >Save Checklist</ButtonUnique>
                        </CenteredContainer>
                    </CardActions>
                </React.Fragment>
            ))}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
            />
        </Container>
    );
}


