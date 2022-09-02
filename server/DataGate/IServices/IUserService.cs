namespace DataGate.IServices;

public interface IUserService
{
    void CreateUser(string firstName, string lastName, string username, string email, string password);
}