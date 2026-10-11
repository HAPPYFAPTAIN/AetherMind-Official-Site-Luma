-- 0002 角色归一：社区管理员同步进官网角色表（community_admins 本阶段仍可读）。
INSERT INTO official_roles(user_id, role, updated_at_ms)
  SELECT user_id, 'ADMIN', {now_ms} FROM community_admins
  WHERE user_id NOT IN (SELECT user_id FROM official_roles);
