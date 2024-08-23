using Giraffe;

await Configurator.init();
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddRazorPages();
builder.Services.AddRazorComponents()
            .AddInteractiveServerComponents();
builder.Services.AddServerSideBlazor(o => o.DetailedErrors = true);
if (Configurator.config.bind_port is not null)
    builder.WebHost.UseUrls($"http://0.0.0.0:{Configurator.config.bind_port}");
var app = builder.Build();
if (!app.Environment.IsDevelopment())
    app.UseExceptionHandler("/Error");
app.UseStaticFiles();
app.MapBlazorHub();
app.UseRouting();
app.UseAuthorization();
app.MapRazorPages();
app.Run();
