using TalStart.IServices;
using TalStart.Models;

namespace TalStart.Services;

public class UserService : IUserService
{
    private TalStartContext db;

    public UserService()
    {
        db = new TalStartContext();
    }
    public bool CreateUser(string firstName, string lastName, string username, string email, string password)
    {
        try
        {
            db.Users.Add(new User() { Firstname = firstName, Lastname = lastName, Username = username, Email = email, Password = password});
            db.SaveChanges();
            return true;
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
            return false;
        }    }
}
