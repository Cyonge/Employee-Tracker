INSERT INTO track_employee.department (ID, Name) VALUES (1, Public School);
INSERT INTO track_employee.department (ID, Name) VALUES (2, Infrastructure);
INSERT INTO track_employee.department (ID, Name) VALUES (3, Management);
INSERT INTO track_employee.department (ID, Name) VALUES (4, Tech);

INSERT INTO `track_employee`.`role` (`ID`, `title`, `pay`, `department_ID`) VALUES ('1', 'Construction', '35000', '3');
INSERT INTO `track_employee`.`role` (`ID`, `title`, `pay`, `department_ID`) VALUES ('2', 'Teacher', '25000', '1');
INSERT INTO `track_employee`.`role` (`ID`, `title`, `pay`, `department_ID`) VALUES ('3', 'Programmer', '150000', '4');
INSERT INTO `track_employee`.`role` (`ID`, `title`, `pay`, `department_ID`) VALUES ('4', 'Coach', '65000', '2');

INSERT INTO `track_employee`.`employee` (`ID`, `first_name`, `last_name`, `role_id`, `manager_id`) VALUES ('1', 'Bob', 'the Builder', '3', '1');
INSERT INTO `track_employee`.`employee` (`ID`, `first_name`, `last_name`, `role_id`, `manager_id`) VALUES ('2', 'Christian', 'Yonge', '4', '1');
INSERT INTO `track_employee`.`employee` (`ID`, `first_name`, `last_name`, `role_id`, `manager_id`) VALUES ('3', 'Osei', 'Bonsu', '1', '1');
INSERT INTO `track_employee`.`employee` (`ID`, `first_name`, `last_name`, `role_id`, `manager_id`) VALUES ('4', 'Another', 'Random Guy', '2', '1');

