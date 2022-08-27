using TalStart.IServices;
using TalStart.Services;

var builder = WebApplication.CreateBuilder(args);

var allowCors = "allowCores";

// Add services to the container.
builder.Services.AddTransient<IPipelineService, PipelineService>();
builder.Services.AddTransient<IDatasetService, DatasetService>();
builder.Services.AddTransient<IUserService, UserService>();
//builder.Services.AddTransient<ISqlService, SqlService>();
builder.Services.AddTransient<IScenarioService, ScenarioService>();
builder.Services.AddTransient<IFileService, FileService>();
builder.Services.AddTransient<IDatasetService, DatasetService>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: allowCors,
                      policy =>
                      {
                          policy.AllowAnyOrigin().AllowAnyMethod();
                      });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(allowCors);

app.UseAuthorization();

app.MapControllers();

app.Run();