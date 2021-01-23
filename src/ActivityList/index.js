import React from 'react';
import { withFirebase } from '../Firebase';
import loader from './loader.gif';
import firebase from 'firebase';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

function ActivityList(props) {
    const { loading, activities, editActivity, setOpenSnackbar, setSnackbarMsg, setEditing, authUser } = props;

    const deleteActivity = (i) => {
        // Get key of activity in firebase
        const activityKey = Object.keys(activities)[i];
        // Connect to our firebase API
        const emptyActivity = {
            date: null,
            duration: null,
            type: null,
            name: null,
        };

        firebase.database().ref(authUser.uid).child(activityKey).remove();
        // Show notification
        setOpenSnackbar(true);
        setSnackbarMsg('Deleted activity');
        setTimeout(() => {
            setOpenSnackbar(false)
        }, 3000)

        // stop editing
        setEditing(false);
    }

    return (
        <>
            {
                loading === true
                    ? <img src={loader} alt={loader}></img>
                    : ''
            }

            {
                activities === 'not set' || activities === null
                    ? <p>No activities added yet.</p>
                    :
                    <TableContainer component={Paper} >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>활동명</TableCell>
                                    <TableCell>종류</TableCell>
                                    <TableCell>중요도</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    Object.values(activities).map((activity, i) => {
                                        let { name, type, duration } = activity;
                                        switch (activity.type) {
                                            case 1:
                                                type = "자소서";
                                                break;
                                            case 2:
                                                type = "보고서";
                                                break;
                                            case 3:
                                                type = "면접 모의 질문";
                                                break;
                                            default:
                                                type = "Not set";
                                        };
                                        return (
                                            <TableRow key={i}>
                                                <TableCell>{name}</TableCell>
                                                <TableCell>{type}</TableCell>
                                                <TableCell>{duration}</TableCell>
                                                <TableCell>
                                                    <DeleteIcon
                                                        onClick={e => deleteActivity(i)}
                                                    />
                                                    <EditIcon
                                                        onClick={e => editActivity(activity, i)}
                                                        style={{ marginLeft: "20px" }}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
            }
        </>
    )
};
export default withFirebase(ActivityList);