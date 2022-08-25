namespace TalStart.IServices;

public interface IUserService
{
    bool CreateUser(string firstName, string lastName, string username, string email, string password);
}