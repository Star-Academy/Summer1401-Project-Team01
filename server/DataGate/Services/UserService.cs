using DataGate.IServices;
using DataGate.Models;

namespace DataGate.Services;

public class UserService : IUserService
{
    private DataGateContext _db;

    public UserService()
    {
        _db = new DataGateContext();
    }

    public void CreateUser(string firstName, string lastName, string username, string email, string password)
    {
        _db.Users.Add(new User()
            { Firstname = firstName, Lastname = lastName, Username = username, Email = email, Password = password });
        _db.SaveChanges();
    }
}