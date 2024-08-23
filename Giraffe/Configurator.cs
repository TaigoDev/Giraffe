using Giraffe.Entities.Configs;
using Microsoft.Extensions.Logging;
using MimeKit.Utils;
using System.ComponentModel;
using System.Globalization;
using YamlDotNet.Serialization;

namespace Giraffe
{
    public static class Configurator
    {
        public static Config config = new();
        public static async Task init()
        {
            config = await SetupConfiguration<Config>("config.yml");
        }

        public static async Task<T> SetupConfiguration<T>(string filename, T obj) where T : class
        {
            if (obj is null)
            {
                Console.WriteLine($"Error create configuration for {filename}. Use default settings");
                obj = (Activator.CreateInstance(typeof(T)) as T)!;
            }

            if (!File.Exists($"{filename}"))
                File.WriteAllText($"{filename}", SerializeYML(obj));
            return DeserializeYML<T>(await File.ReadAllTextAsync($"{filename}"));
        }

        public static async Task<T> SetupConfiguration<T>(string filename) where T : class =>
            await SetupConfiguration(filename, (Activator.CreateInstance(typeof(T)) as T)!);

        public static string SerializeYML(this object obj) => new SerializerBuilder().Build().Serialize(obj);

        public static T DeserializeYML<T>(this string yml) => new DeserializerBuilder().Build().Deserialize<T>(yml);

        public static object? DeserializeYML(this string yml, Type type) => new DeserializerBuilder()
           .Build().Deserialize(yml, type);
    }
}
