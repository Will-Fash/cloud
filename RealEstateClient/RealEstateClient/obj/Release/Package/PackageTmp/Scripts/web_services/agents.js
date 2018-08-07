function getAgentGrid(agent)
{
    return `<div class="col-sm-4 bottom40">
        <div class="agent_wrap">
            <div class="image">
                <div class="img-info" style="width: 100%">
                    <h3>` + agent.Username + `</h3>
                    <p class="top20 bottom30">` + agent.Description + `...</p>
                    <table class="agent_contact table">
                        <tbody>
                            <tr class="bottom10">
                                <td><strong>Phone Number:</strong></td>
                                <td class="text-right">` + agent.Phone + `</td>
                            </tr>
                            <tr>
                                <td><strong>Email Address:</strong></td>
                                <td class="text-right"><a href="mailto:` + agent.Email + `">` + agent.Email +`</a></td>
                            </tr>
                        </tbody>
                    </table>
                    <hr>
                </div>
            </div>
        </div>
    </div>`;
}

$.get(API_HOST + '/api/Agents', function (result) {
    if (result.length > 0) {
        $(result).each(function (i, agent) {
            $('#propertyAgents').append(getAgentGrid(agent));
        });
    }
    else
        $('#propertyAgents').append('<h3 style="margin-bottom: 40px;">No registered agents</h3>');
});