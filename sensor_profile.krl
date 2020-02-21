ruleset sensor_profile {

    meta {
        provides get_threshold, get_phone_number
        shares get_threshold, get_phone_number
    }

    global {
        get_threshold = function() {
            ent:threshold
        }

        get_phone_number = function() {
            ent:phone_number.substr(2)
        }
    }

    rule initialize {
        select when wrangler ruleset_added where event:attr("rids") >< meta:rid
        always {
            ent:threshold := 80.0
            ent:phone_number := "+18013100486"
        }
    }

    rule update_profile {
        select when sensor:profile_updated 

        always {
            ent:threshold := as(event:attr("threshold"))
            ent:phone_number := "+1" + event:attr("phone_number")
        }

    }

}