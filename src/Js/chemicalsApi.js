console.log("chemicalsApi.js loaded");

window.getChemicals = async function () {
    const { data, error } = await window.supabase
        .from("chemicals")
        .select(`
            id,
            name,
            chemical_formula,
            use_purpose,
            storage_information,
            supplier
        `)
        .order("name", { ascending: true });

    if (error) {
        console.error("Error fetching chemicals:", error);
        throw error;
    }


    return data;
};

// Fetch chemicals from Supabase using RPC function get_chemicals
async function fetchChemicals() {
  const { data, error } = await supabase.rpc("get_chemicals");

  if (error) {
    console.error("RPC error:", error);
    throw error;
  }

  console.log("chemicals:", data);
  return data;
};