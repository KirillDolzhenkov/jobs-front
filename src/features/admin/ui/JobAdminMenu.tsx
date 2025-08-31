import { Divider, ListItemIcon, ListItemText, Menu, MenuItem }                  from '@mui/material';
import { Edit as EditIcon, Visibility as VisibilityIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { FC }                                                                   from 'react';

interface JobAdminMenuProps {
  anchorEl: null | HTMLElement;
  onClose: () => void;
  onEdit: () => void;
  onView: () => void;
  onDelete: () => void;
}

const JobAdminMenu: FC<JobAdminMenuProps> = ({
  anchorEl,
  onClose,
  onEdit,
  onView,
  onDelete,
}) => {
  return (
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={onClose}>
      <MenuItem onClick={onEdit}>
        <ListItemIcon><EditIcon fontSize="small" /></ListItemIcon>
        <ListItemText>Edit Job</ListItemText>
      </MenuItem>
      <MenuItem onClick={onView}>
        <ListItemIcon><VisibilityIcon fontSize="small" /></ListItemIcon>
        <ListItemText>View Public Profile</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem onClick={onDelete} sx={{ color: 'error.main' }}>
        <ListItemIcon><DeleteIcon fontSize="small" color="error" /></ListItemIcon>
        <ListItemText>Delete Job</ListItemText>
      </MenuItem>
    </Menu>
  );
};

export default JobAdminMenu;