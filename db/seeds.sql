use employees;

INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 160000, 3),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Luigi', 'Green', 1, NULL),
    ('Mario', 'Red', 2, 1),
    ('Warrio', 'Purple', 3, NULL),
    ('Peach', 'Orange', 4, 3),
    ('Bowser', 'Black', 5, NULL),
    ('Yoshi', 'Darkgreen', 6, 5),
    ('Toad', 'Dots', 7, NULL),
    ('Toadette', 'Pinky', 8, 7);