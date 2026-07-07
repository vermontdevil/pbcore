import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY

if (!supabaseUrl || !supabaseKey || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabaseClient = createClient(supabaseUrl, supabaseKey)
export const supabaseServiceClient = createClient(supabaseUrl, supabaseServiceKey)
