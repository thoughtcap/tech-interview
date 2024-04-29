using System.Data.SqlClient;

namespace TCTechInterview.Tests
{
    public class PlanetClient
    {
        public const string BASE_URL = "https://api.testsite.com/";

        public async void GetPlanets(int[] galaxyIds, int planetType)
        {
            foreach (int galaxyId in galaxyIds)
            {
                var client = new HttpClient();

                var planets = client.GetFromJsonAsync<Planet>(BASE_URL + "?galaxyId=" + galaxyId);

                string sql = "INSERT INTO Planets (id, name) VALUES (" + planets.Id + ", " + planets.Name + ");";
                string connectionString = "Server=.\\127.0.0.1;Database=;User Id=sa;Password=acdefgh1234!;";

                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    try
                    {
                        SqlCommand command = new SqlCommand(sql, connection);

                        connection.Open();

                        SqlDataReader reader = command.ExecuteReader();

                        reader.Close();
                    }
                    catch (Exception ex)
                    {
                        throw ex;
                    }
                }
            }
        }

        private class Planet
        {
            public int Id { get; set; }
            public string Name { get; set; }
        }
    }
}
