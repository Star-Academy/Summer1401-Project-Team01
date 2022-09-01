using TalStart.IServices;
using TalStart.Models;

namespace TalStart.Services;

public class UserService : IUserService
{
    private TalStartContext _db;

    public UserService()
    {
        _db = new TalStartContext();
    }

    public void CreateUser(string firstName, string lastName, string username, string email, string password)
    {
        _db.Users.Add(new User()
            { Firstname = firstName, Lastname = lastName, Username = username, Email = email, Password = password });
        _db.SaveChanges();
    }
}