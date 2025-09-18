-- Clean up duplicate projects
-- This script removes duplicate projects and keeps only the first occurrence

-- First, delete duplicate projects (keep the one with the lowest ID)
DELETE p1 FROM projects p1
INNER JOIN projects p2 
WHERE p1.id > p2.id 
AND p1.title = p2.title 
AND p1.description = p2.description;

-- Clean up orphaned project_technologies
DELETE pt FROM project_technologies pt
LEFT JOIN projects p ON pt.project_id = p.id
WHERE p.id IS NULL;

-- Clean up duplicate skills (keep the one with the lowest ID)
DELETE s1 FROM skills s1
INNER JOIN skills s2 
WHERE s1.id > s2.id 
AND s1.name = s2.name;
