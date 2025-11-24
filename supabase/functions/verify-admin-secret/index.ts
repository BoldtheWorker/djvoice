import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { secret } = await req.json();
    const ADMIN_SECRET = Deno.env.get('ADMIN_SECRET');

    if (!ADMIN_SECRET) {
      throw new Error('Admin secret not configured');
    }

    if (secret === ADMIN_SECRET) {
      return new Response(
        JSON.stringify({ valid: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ valid: false, error: 'Invalid secret' }),
      { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ valid: false, error: message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
