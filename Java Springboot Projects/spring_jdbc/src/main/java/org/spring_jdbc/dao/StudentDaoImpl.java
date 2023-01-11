package org.spring_jdbc.dao;

import org.spring_jdbc.entities.Student;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

public class StudentDaoImpl implements StudentDao{

    private JdbcTemplate jdbcTemplate;

    public JdbcTemplate getJdbcTemplate() {
        return jdbcTemplate;
    }

    public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public int insert(Student student) {
        String query = "insert into student(id, name, city) values(?, ?, ?)";
        int insert = this.jdbcTemplate.update(query, student.getId(), student.getName(), student.getCity());

        System.out.println(String.format("Number of records inserted: %s", insert));;
        return 1;
    }

    @Override
    public int update(Student student) {
        String query = "update student set name = ? , city = ? where id = ?";
        int result = this.jdbcTemplate.update(query, student.getName(), student.getCity(), student.getId());

        System.out.println(String.format("Number of records updated: %s", result));
        return 1;
    }

    @Override
    public int delete(int studentId) {
        String query = "delete from student where id = ?";
        int result = this.jdbcTemplate.update(query, studentId);

        System.out.println(String.format("Number of records deleted: %s", result));
        return 1;
    }

    @Override
    public Student getStudent(int studentId) {
        String query = "select * from student where id = ?";
        RowMapper<Student> rowMapper = new RowMapperImpl();
        Student student = this.jdbcTemplate.queryForObject(query, rowMapper, studentId);

        return student;
    }

    @Override
    public List<Student> getAllStudents() {
        String query = "select * from student";
        List<Student> students = this.jdbcTemplate.query(query, new RowMapper(){
            @Override
            public Student mapRow(ResultSet rs, int rowNum) throws SQLException {
                Student student = new Student();
                student.setId(rs.getInt(1));
                student.setName(rs.getString(2));
                student.setCity(rs.getString(3));

                return student;
            }
        });

        return students;
    }
}
