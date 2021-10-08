function getPlots(id) 
{
    //Read samples.json file
        d3.json("samples.json").then (sampledata =>{

            //Intialize the variables
            var ids = sampledata.samples[0].otu_ids;
            var sample_Values =  sampledata.samples[0].sample_values.slice(0,10).reverse();
            var labels =  sampledata.samples[0].otu_labels.slice(0,10);    
            var OTU_top = ( sampledata.samples[0].otu_ids.slice(0, 10)).reverse();
            var OTU_id = OTU_top.map(d => "OTU " + d);
            var labels =  sampledata.samples[0].otu_labels.slice(0,10);
            
            
            var trace = {
                x: sample_Values,
                y: OTU_id,
                text: labels,
                marker: {
                color: 'blue'},
                type:"bar",
                orientation: "h",
            };
            
            // create layout variable to set plots layout
            var data = [trace];
            var layout = {
                title: "Top 10 OTU",
                yaxis:{
                    tickmode:"linear",
                },
                margin: {
                    l: 100,
                    r: 100,
                    t: 100,
                    b: 30
                }
            };
    
            // create the bar plot
            Plotly.newPlot("bar", data, layout);
            // The bubble chart
            var trace1 = {
                x: sampledata.samples[0].otu_ids,
                y: sampledata.samples[0].sample_values,
                mode: "markers",
                marker: {
                    size: sampledata.samples[0].sample_values,
                    color: sampledata.samples[0].otu_ids
                },
                text:  sampledata.samples[0].otu_labels
    
            };
    
            // set the layout for the bubble plot
            var layout_2 = {
                xaxis:{title: "OTU ID"},
                height: 400,
                width: 900
            };
    
            // creating data variable 
            var data1 = [trace1];
    
        // create the bubble plot
        Plotly.newPlot("bubble", data1, layout_2); 
        
        });


        function optionChanged(id) {
            getPlots(id);
            getDemoInfo(id);
        }     
        
    }  

    // create the function for the initial data rendering
    function init() 
    {
                var dropdown = d3.select("#selDataset");
         
        d3.json("samples.json").then((data)=> {
            console.log(data)
             
            data.names.forEach(function(name)
            {
                dropdown.append("option").text(name).property("value");
            });
    
             getPlots(data.names[0]);
            getDemoInfo(data.names[0]);
        });
    }


    init();