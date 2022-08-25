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
    public bool CreateUser(string firstName, string lastName, string username, string email, string password)
    {
        try
        {
            _db.Users.Add(new User() { Firstname = firstName, Lastname = lastName, Username = username, Email = email, Password = password});
            _db.SaveChanges();
            return true;
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
            return false;
        }    
    }
}
