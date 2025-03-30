
select
    u.id,
    u.is_admin,
    u.name,
    u.admin_name,
    case when u.invitation_key = ? then 1 else 0 end is_current_user
from users u;
